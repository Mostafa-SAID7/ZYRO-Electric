using Xunit;
using Tests.Common.Fixtures;

namespace Tests.Integration;

/// <summary>
/// Collection definition for shared database fixture within the Integration test assembly
/// </summary>
[CollectionDefinition("Database collection")]
public class DatabaseCollection : ICollectionFixture<DatabaseFixture>
{
    // This class has no code, and is never created. Its purpose is simply
    // to define the collection for Xunit.
}
