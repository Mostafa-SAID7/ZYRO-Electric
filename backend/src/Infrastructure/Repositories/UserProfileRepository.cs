using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories;

/// <summary>
/// User profile repository - single responsibility: user profile data access
/// </summary>
public class UserProfileRepository : IUserProfileRepository
{
    private readonly DbContext _context;

    public UserProfileRepository(DbContext context)
    {
        _context = context;
    }

    public async Task<UserProfile?> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return await _context.Set<UserProfile>()
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.UserId == userId, cancellationToken);
    }

    public async Task<IEnumerable<UserClaim>> GetUserClaimsAsync(Guid userId, CancellationToken cancellationToken = default)
    {
        return await _context.Set<UserClaim>()
            .AsNoTracking()
            .Where(c => c.UserId == userId)
            .ToListAsync(cancellationToken);
    }

    public async Task AddAsync(UserProfile profile, CancellationToken cancellationToken = default)
    {
        _context.Set<UserProfile>().Add(profile);
        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateAsync(UserProfile profile, CancellationToken cancellationToken = default)
    {
        _context.Set<UserProfile>().Update(profile);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
