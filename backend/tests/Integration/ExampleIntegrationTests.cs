using Xunit;
using FluentAssertions;
using Tests.Common.Fixtures;
using Microsoft.Data.SqlClient;

namespace Tests.Integration;

/// <summary>
/// Example integration tests demonstrating testcontainer database testing
/// Replace with actual repository/service integration tests
/// </summary>
[Collection("Database collection")]
public class ExampleIntegrationTests : BaseTestFixture
{
    private readonly DatabaseFixture _databaseFixture;

    public ExampleIntegrationTests(DatabaseFixture databaseFixture)
    {
        _databaseFixture = databaseFixture;
    }

    [Fact]
    public async Task Example_DatabaseConnection_ShouldSucceed()
    {
        // Arrange
        if (string.IsNullOrEmpty(_databaseFixture.ConnectionString))
        {
            throw new InvalidOperationException("Connection string is not set");
        }

        // Act
        using var connection = new SqlConnection(_databaseFixture.ConnectionString);
        await connection.OpenAsync();

        // Assert
        connection.State.Should().Be(System.Data.ConnectionState.Open);
        await connection.CloseAsync();
    }

    [Fact]
    public async Task Example_CreateTable_ShouldWork()
    {
        // Arrange
        if (string.IsNullOrEmpty(_databaseFixture.ConnectionString))
        {
            throw new InvalidOperationException("Connection string is not set");
        }

        using var connection = new SqlConnection(_databaseFixture.ConnectionString);
        await connection.OpenAsync();

        // Act
        using var command = connection.CreateCommand();
        command.CommandText = @"
            CREATE TABLE Examples (
                Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
                Name NVARCHAR(100) NOT NULL,
                CreatedAt DATETIME2 DEFAULT GETUTCDATE()
            )";
        await command.ExecuteNonQueryAsync();

        // Assert - Query table should succeed
        command.CommandText = "SELECT COUNT(*) FROM Examples";
        var result = await command.ExecuteScalarAsync();
        result.Should().Be(0);

        await connection.CloseAsync();
    }

    [Fact]
    public async Task Example_InsertAndQuery_ShouldReturnData()
    {
        // Arrange
        if (string.IsNullOrEmpty(_databaseFixture.ConnectionString))
        {
            throw new InvalidOperationException("Connection string is not set");
        }

        using var connection = new SqlConnection(_databaseFixture.ConnectionString);
        await connection.OpenAsync();

        // Create table
        using var createCommand = connection.CreateCommand();
        createCommand.CommandText = @"
            CREATE TABLE Users (
                Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
                Name NVARCHAR(100) NOT NULL,
                Email NVARCHAR(100) UNIQUE NOT NULL
            )";
        await createCommand.ExecuteNonQueryAsync();

        // Act - Insert data
        using var insertCommand = connection.CreateCommand();
        insertCommand.CommandText = "INSERT INTO Users (Name, Email) VALUES ('John Doe', 'john@example.com')";
        var insertedRows = await insertCommand.ExecuteNonQueryAsync();

        // Assert
        insertedRows.Should().Be(1);

        // Query back
        using var selectCommand = connection.CreateCommand();
        selectCommand.CommandText = "SELECT COUNT(*) FROM Users WHERE Email = 'john@example.com'";
        var count = await selectCommand.ExecuteScalarAsync();
        count.Should().Be(1);

        await connection.CloseAsync();
    }

    [Fact]
    public async Task Example_Transaction_ShouldRollback()
    {
        // Arrange
        if (string.IsNullOrEmpty(_databaseFixture.ConnectionString))
        {
            throw new InvalidOperationException("Connection string is not set");
        }

        using var connection = new SqlConnection(_databaseFixture.ConnectionString);
        await connection.OpenAsync();

        // Create table
        using var createCommand = connection.CreateCommand();
        createCommand.CommandText = @"
            CREATE TABLE Products (
                Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
                Name NVARCHAR(100) NOT NULL,
                Price DECIMAL(18,2)
            )";
        await createCommand.ExecuteNonQueryAsync();

        // Act - Start transaction and insert
        using var transaction = connection.BeginTransaction();
        using var insertCommand = connection.CreateCommand();
        insertCommand.Transaction = transaction;
        insertCommand.CommandText = "INSERT INTO Products (Name, Price) VALUES ('Test Product', 99.99)";
        await insertCommand.ExecuteNonQueryAsync();

        // Rollback transaction
        await transaction.RollbackAsync();

        // Assert - Should be no data after rollback
        using var selectCommand = connection.CreateCommand();
        selectCommand.CommandText = "SELECT COUNT(*) FROM Products";
        var count = await selectCommand.ExecuteScalarAsync();
        count.Should().Be(0);

        await connection.CloseAsync();
    }
}
