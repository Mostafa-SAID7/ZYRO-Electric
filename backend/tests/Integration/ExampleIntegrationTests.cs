using Xunit;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Infrastructure.Repositories;

namespace Tests.Integration;

public class TestDbContext : DbContext
{
    public TestDbContext(DbContextOptions<TestDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasKey(u => u.Id);
        // Ignore relationships for simple in-memory tests if not needed
        modelBuilder.Entity<User>().Ignore(u => u.UserRoles);
        modelBuilder.Entity<User>().Ignore(u => u.RefreshTokens);
        modelBuilder.Entity<User>().Ignore(u => u.UserClaims);
        modelBuilder.Entity<User>().Ignore(u => u.UserProfiles);
    }
}

public class ExampleIntegrationTests
{
    private DbContext GetInMemoryContext()
    {
        var options = new DbContextOptionsBuilder<TestDbContext>()
            .UseInMemoryDatabase(databaseName: $"InMemoryDb_{Guid.NewGuid()}")
            .Options;
            
        var context = new TestDbContext(options);
        context.Database.EnsureCreated();
        return context;
    }

    [Fact]
    public async Task Example_InMemoryDatabase_ShouldSucceed()
    {
        // Arrange
        using var context = GetInMemoryContext();
        var repository = new UserRepository(context);

        var user = new User("testuser", "test@test.com", "Test", "User");

        // Act
        await repository.AddAsync(user);
        var retrievedUser = await repository.GetUserByIdAsync(user.Id);

        // Assert
        retrievedUser.Should().NotBeNull();
        retrievedUser!.Email.Should().Be("test@test.com");
    }

    [Fact]
    public async Task Example_InMemoryDatabase_UpdateShouldWork()
    {
        // Arrange
        using var context = GetInMemoryContext();
        var repository = new UserRepository(context);
        var user = new User("updateuser", "update@test.com", "Update", "User");
        await repository.AddAsync(user);

        // Act
        user.SetFirstName("UpdatedName");
        await repository.UpdateAsync(user);
        var retrievedUser = await repository.GetUserByIdAsync(user.Id);

        // Assert
        retrievedUser.Should().NotBeNull();
        retrievedUser!.FirstName.Should().Be("UpdatedName");
    }
}
