using Application.Dtos.Auth;
using Application.Services;
using Domain.Entities;
using Infrastructure.Repositories;

namespace Infrastructure.Services;

/// <summary>
/// User authentication service - single responsibility: login and registration
/// </summary>
public class UserAuthenticationService : IUserAuthenticationService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordService _passwordService;
    private readonly ITokenManagementService _tokenManagementService;

    public UserAuthenticationService(
        IUserRepository userRepository,
        IPasswordService passwordService,
        ITokenManagementService tokenManagementService)
    {
        _userRepository = userRepository;
        _passwordService = passwordService;
        _tokenManagementService = tokenManagementService;
    }

    public async Task<LoginResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default)
    {
        var user = await _userRepository.GetUserWithRolesByUsernameAsync(request.Username, cancellationToken);

        if (user == null || !_passwordService.VerifyPassword(request.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid credentials");

        user.UpdateLastLogin();
        await _userRepository.UpdateAsync(user, cancellationToken);

        var roles = user.UserRoles.Select(ur => ur.Role!.Name).ToList();
        var accessToken = _tokenManagementService.GenerateAccessToken(user.Id, user.Username, roles);
        var refreshToken = _tokenManagementService.GenerateRefreshToken();

        return new LoginResponse
        {
            UserId = user.Id,
            Username = user.Username,
            Email = user.Email,
            FullName = user.GetFullName(),
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            ExpiresIn = 15 * 60,
            Roles = roles
        };
    }

    public async Task<LoginResponse> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default)
    {
        var existingUser = await _userRepository.GetUserByUsernameAsync(request.Username, cancellationToken);
        if (existingUser != null)
            throw new InvalidOperationException("Username already exists");

        existingUser = await _userRepository.GetUserByEmailAsync(request.Email, cancellationToken);
        if (existingUser != null)
            throw new InvalidOperationException("Email already exists");

        var user = new User(request.Username, request.Email, request.FirstName, request.LastName);
        var passwordHash = _passwordService.HashPassword(request.Password);
        user.SetPasswordHash(passwordHash);

        await _userRepository.AddAsync(user, cancellationToken);

        var roles = new List<string> { "User" };
        var accessToken = _tokenManagementService.GenerateAccessToken(user.Id, user.Username, roles);
        var refreshToken = _tokenManagementService.GenerateRefreshToken();

        return new LoginResponse
        {
            UserId = user.Id,
            Username = user.Username,
            Email = user.Email,
            FullName = user.GetFullName(),
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            ExpiresIn = 15 * 60,
            Roles = roles
        };
    }
}
