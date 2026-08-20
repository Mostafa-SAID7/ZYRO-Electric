using Application.Dtos.Auth;
using Application.Services;
using Infrastructure.Repositories;

namespace Infrastructure.Services;

/// <summary>
/// Password management service - single responsibility: password changes
/// </summary>
public class PasswordManagementService : IPasswordManagementService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordService _passwordService;

    public PasswordManagementService(
        IUserRepository userRepository,
        IPasswordService passwordService)
    {
        _userRepository = userRepository;
        _passwordService = passwordService;
    }

    public async Task ChangePasswordAsync(
        Guid userId,
        ChangePasswordRequest request,
        CancellationToken cancellationToken = default)
    {
        var user = await _userRepository.GetUserByIdAsync(userId, cancellationToken);

        if (user == null)
            throw new InvalidOperationException("User not found");

        if (!_passwordService.VerifyPassword(request.CurrentPassword, user.PasswordHash))
            throw new UnauthorizedAccessException("Current password is incorrect");

        var newHash = _passwordService.HashPassword(request.NewPassword);
        user.SetPasswordHash(newHash);
        user.UpdatedAtNow();

        await _userRepository.UpdateAsync(user, cancellationToken);
    }
}
