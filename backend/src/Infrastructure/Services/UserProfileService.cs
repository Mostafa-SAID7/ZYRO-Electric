using Application.Dtos.Auth;
using Application.Services;
using Infrastructure.Repositories;

namespace Infrastructure.Services;

/// <summary>
/// User profile service - single responsibility: user profile management
/// Uses repositories for all data access (DIP - no DbContext coupling)
/// </summary>
public class UserProfileService : IUserProfileService
{
    private readonly IUserRepository _userRepository;
    private readonly IUserProfileRepository _userProfileRepository;

    public UserProfileService(
        IUserRepository userRepository,
        IUserProfileRepository userProfileRepository)
    {
        _userRepository = userRepository;
        _userProfileRepository = userProfileRepository;
    }

    public async Task<UserProfileDto> GetProfileAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        var user = await _userRepository.GetUserWithRolesAsync(userId, cancellationToken);

        if (user == null)
            throw new InvalidOperationException("User not found");

        var userProfile = await _userProfileRepository.GetByUserIdAsync(userId, cancellationToken);
        var claims = await _userProfileRepository.GetUserClaimsAsync(userId, cancellationToken);

        return new UserProfileDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            FullName = user.GetFullName(),
            PhoneNumber = userProfile?.PhoneNumber,
            ProfilePictureUrl = userProfile?.ProfilePictureUrl,
            Bio = userProfile?.Bio,
            Language = userProfile?.Language ?? "en",
            TwoFactorEnabled = userProfile?.TwoFactorEnabled ?? false,
            CreatedAt = user.CreatedAt,
            Roles = user.UserRoles.Select(ur => ur.Role!.Name).ToList(),
            Claims = claims.Select(c => new UserClaimDto
            {
                ClaimType = c.ClaimType,
                ClaimValue = c.ClaimValue
            }).ToList()
        };
    }

    public async Task UpdateProfileAsync(Guid userId, UserProfileDto profile, CancellationToken cancellationToken = default)
    {
        var user = await _userRepository.GetUserByIdAsync(userId, cancellationToken);

        if (user == null)
            throw new InvalidOperationException("User not found");

        user.SetFirstName(profile.FullName.Split(' ').FirstOrDefault() ?? "");
        user.SetLastName(string.Join(" ", profile.FullName.Split(' ').Skip(1)));
        user.UpdatedAtNow();

        var userProfile = await _userProfileRepository.GetByUserIdAsync(userId, cancellationToken);

        if (userProfile == null)
        {
            userProfile = new Domain.Entities.UserProfile(userId, profile.FullName);
            await _userProfileRepository.AddAsync(userProfile, cancellationToken);
        }
        else
        {
            userProfile.SetBio(profile.Bio);
            userProfile.SetPhoneNumber(profile.PhoneNumber);
            userProfile.SetProfilePictureUrl(profile.ProfilePictureUrl);
            await _userProfileRepository.UpdateAsync(userProfile, cancellationToken);
        }

        await _userRepository.UpdateAsync(user, cancellationToken);
    }
}
