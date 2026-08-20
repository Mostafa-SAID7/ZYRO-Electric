using Application.Dtos.Auth;
using Domain.Entities;

namespace Application.Services;

/// <summary>
/// Token management service interface - handles JWT and refresh token lifecycle
/// </summary>
public interface ITokenManagementService
{
    Task<RefreshTokenResponse> RefreshTokenAsync(string refreshToken, User user, IEnumerable<string> roles, CancellationToken cancellationToken = default);
    Task RevokeTokenAsync(string refreshToken, CancellationToken cancellationToken = default);
    Task RevokeAllUserTokensAsync(Guid userId, CancellationToken cancellationToken = default);
    string GenerateAccessToken(Guid userId, string username, IEnumerable<string> roles);
    string GenerateRefreshToken();
}
