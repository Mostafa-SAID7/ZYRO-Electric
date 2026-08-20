using Application.Dtos.Auth;
using Application.Services;
using Domain.Entities;
using Infrastructure.Repositories;

namespace Infrastructure.Services;

/// <summary>
/// Token management service - single responsibility: JWT and refresh token lifecycle
/// </summary>
public class TokenManagementService : ITokenManagementService
{
    private readonly IJwtTokenService _jwtTokenService;
    private readonly IRefreshTokenRepository _refreshTokenRepository;

    public TokenManagementService(
        IJwtTokenService jwtTokenService,
        IRefreshTokenRepository refreshTokenRepository)
    {
        _jwtTokenService = jwtTokenService;
        _refreshTokenRepository = refreshTokenRepository;
    }

    public async Task<RefreshTokenResponse> RefreshTokenAsync(
        string refreshToken,
        User user,
        IEnumerable<string> roles,
        CancellationToken cancellationToken = default)
    {
        var token = await _refreshTokenRepository.GetByTokenAsync(refreshToken, cancellationToken);

        if (token == null || !token.IsValid)
            throw new UnauthorizedAccessException("Invalid or expired refresh token");

        var newAccessToken = _jwtTokenService.GenerateAccessToken(user.Id, user.Username, roles);
        var newRefreshToken = _jwtTokenService.GenerateRefreshToken();

        token.Revoke();
        await _refreshTokenRepository.UpdateAsync(token, cancellationToken);

        var newRefreshTokenEntity = new RefreshToken(user.Id, newRefreshToken, 7);
        await _refreshTokenRepository.AddAsync(newRefreshTokenEntity, cancellationToken);

        return new RefreshTokenResponse
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken,
            ExpiresIn = 15 * 60
        };
    }

    public async Task RevokeTokenAsync(string refreshToken, CancellationToken cancellationToken = default)
    {
        var token = await _refreshTokenRepository.GetByTokenAsync(refreshToken, cancellationToken);

        if (token == null)
            throw new InvalidOperationException("Refresh token not found");

        token.Revoke();
        await _refreshTokenRepository.UpdateAsync(token, cancellationToken);
    }

    public async Task RevokeAllUserTokensAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        await _refreshTokenRepository.RevokeAllUserTokensAsync(userId, cancellationToken);
    }

    public string GenerateAccessToken(Guid userId, string username, IEnumerable<string> roles)
    {
        return _jwtTokenService.GenerateAccessToken(userId, username, roles);
    }

    public string GenerateRefreshToken()
    {
        return _jwtTokenService.GenerateRefreshToken();
    }
}
