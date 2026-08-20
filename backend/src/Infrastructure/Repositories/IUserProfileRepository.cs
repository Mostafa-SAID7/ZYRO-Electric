using Domain.Entities;

namespace Infrastructure.Repositories;

/// <summary>
/// User profile repository interface - DIP: services depend on abstraction
/// Single responsibility: user profile data access
/// </summary>
public interface IUserProfileRepository
{
    Task<UserProfile?> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<IEnumerable<UserClaim>> GetUserClaimsAsync(Guid userId, CancellationToken cancellationToken = default);
    Task AddAsync(UserProfile profile, CancellationToken cancellationToken = default);
    Task UpdateAsync(UserProfile profile, CancellationToken cancellationToken = default);
}
