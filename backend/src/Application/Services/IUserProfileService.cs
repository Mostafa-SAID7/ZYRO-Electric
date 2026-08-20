using Application.Dtos.Auth;

namespace Application.Services;

/// <summary>
/// User profile service interface - handles profile get and update
/// </summary>
public interface IUserProfileService
{
    Task<UserProfileDto> GetProfileAsync(Guid userId, CancellationToken cancellationToken = default);
    Task UpdateProfileAsync(Guid userId, UserProfileDto profile, CancellationToken cancellationToken = default);
}
