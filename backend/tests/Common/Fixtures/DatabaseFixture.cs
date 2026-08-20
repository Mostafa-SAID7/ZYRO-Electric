using Testcontainers.MsSql;
using Xunit;

namespace Tests.Common.Fixtures;

/// <summary>
/// Shared database fixture for integration tests using SQL Server testcontainer
/// </summary>
public class DatabaseFixture : IAsyncLifetime
{
    private readonly MsSqlContainer _container;
    
    public string? ConnectionString { get; private set; }
    public string? DbName { get; private set; }

    public DatabaseFixture()
    {
        DbName = $"TestDb_{Guid.NewGuid():N}".Substring(0, 30); // SQL Server has 128 char limit
        
        _container = new MsSqlBuilder()
            .WithImage("mcr.microsoft.com/mssql/server:2022-latest")
            .WithEnvironment("ACCEPT_EULA", "Y")
            .WithEnvironment("SA_PASSWORD", "TestPassword123!")
            .WithPortBinding(1433, true)
            .Build();
    }

    public async Task InitializeAsync()
    {
        await _container.StartAsync();
        ConnectionString = _container.GetConnectionString();
        
        // Create test database
        if (ConnectionString != null)
        {
            var masterConnection = _container.GetConnectionString().Replace("Database=master", "");
            using var connection = new System.Data.SqlClient.SqlConnection(masterConnection);
            connection.Open();
            using var command = connection.CreateCommand();
            command.CommandText = $"CREATE DATABASE [{DbName}]";
            await command.ExecuteNonQueryAsync();
            connection.Close();
        }
    }

    public async Task DisposeAsync()
    {
        if (_container != null)
        {
            await _container.StopAsync();
            await _container.DisposeAsync();
        }
    }
}

/// <summary>
/// Collection definition for shared database fixture
/// </summary>
[CollectionDefinition("Database collection")]
public class DatabaseCollection : ICollectionFixture<DatabaseFixture>
{
    // This class has no code, and is never created. Its purpose is simply
    // to define the collection for Xunit.
}
