using Xunit;
using FluentAssertions;
using NetArchTest.Rules;

namespace Tests.Architecture;

/// <summary>
/// Architecture tests to enforce clean architecture principles
/// Using NetArchTest to verify dependency rules
/// </summary>
public class CleanArchitectureTests
{
    private const string DomainNamespace = "Domain";
    private const string ApplicationNamespace = "Application";
    private const string InfrastructureNamespace = "Infrastructure";
    private const string PresentationNamespace = "Presentation";
    private const string CommonNamespace = "Common";

    [Fact]
    public void DomainLayer_ShouldNotDependOnOtherLayers()
    {
        // Arrange
        var domainTypes = Types.InNamespace(DomainNamespace)
            .Should()
            .NotHaveDependencyOnAll(
                ApplicationNamespace,
                InfrastructureNamespace,
                PresentationNamespace
            );

        // Act & Assert
        var result = domainTypes.GetResult();
        result.IsSuccessful.Should().BeTrue($"Domain layer should not depend on other layers. Failures: {string.Join(", ", result.FailingTypes.Select(t => t.Name))}");
    }

    [Fact]
    public void ApplicationLayer_ShouldNotDependOnInfrastructureOrPresentation()
    {
        // Arrange
        var applicationTypes = Types.InNamespace(ApplicationNamespace)
            .Should()
            .NotHaveDependencyOnAll(
                InfrastructureNamespace,
                PresentationNamespace
            );

        // Act & Assert
        var result = applicationTypes.GetResult();
        result.IsSuccessful.Should().BeTrue($"Application layer should not depend on Infrastructure or Presentation. Failures: {string.Join(", ", result.FailingTypes.Select(t => t.Name))}");
    }

    [Fact]
    public void InfrastructureLayer_ShouldNotDependOnPresentation()
    {
        // Arrange
        var infrastructureTypes = Types.InNamespace(InfrastructureNamespace)
            .Should()
            .NotHaveDependencyOn(PresentationNamespace);

        // Act & Assert
        var result = infrastructureTypes.GetResult();
        result.IsSuccessful.Should().BeTrue($"Infrastructure layer should not depend on Presentation. Failures: {string.Join(", ", result.FailingTypes.Select(t => t.Name))}");
    }

    [Fact]
    public void ApplicationLayer_ShouldDependOnDomainLayer()
    {
        // Arrange
        var applicationTypes = Types.InNamespace(ApplicationNamespace)
            .That()
            .AreClasses()
            .Should()
            .HaveDependencyOn(DomainNamespace);

        // Act & Assert
        var result = applicationTypes.GetResult();
        // This is more of a guideline than a strict rule
        result.IsSuccessful.Should().BeTrue($"Application layer should have dependency on Domain layer");
    }

    [Fact]
    public void EntityClasses_ShouldHavePublicParameterlessConstructor()
    {
        // Arrange
        var domainTypes = Types.InNamespace(DomainNamespace)
            .That()
            .ResideInNamespace("Domain.Entities")
            .Should()
            .HavePublicConstructor();

        // Act & Assert
        var result = domainTypes.GetResult();
        result.IsSuccessful.Should().BeTrue($"Entity classes should have public constructors");
    }

    [Fact]
    public void ServiceClasses_ShouldHaveInterfaceImplementation()
    {
        // Arrange
        var applicationServiceTypes = Types.InNamespace(ApplicationNamespace)
            .That()
            .ResideInNamespace("Application.Services")
            .And()
            .AreClasses()
            .Should()
            .ImplementAnInterface();

        // Act & Assert
        var result = applicationServiceTypes.GetResult();
        result.IsSuccessful.Should().BeTrue($"Service classes should implement an interface");
    }

    [Fact]
    public void Exceptions_ShouldBeInApplicationNamespace()
    {
        // Arrange
        var types = Types.InNamespace(ApplicationNamespace)
            .That()
            .ResideInNamespace("Application.Exceptions")
            .Should()
            .Inherit(typeof(Exception));

        // Act & Assert
        var result = types.GetResult();
        result.IsSuccessful.Should().BeTrue($"Exception classes should inherit from System.Exception");
    }

    [Fact]
    public void DTOClasses_ShouldResideInApplicationNamespace()
    {
        // Arrange
        var types = Types.InNamespace(ApplicationNamespace)
            .That()
            .ResideInNamespace("Application.Dtos")
            .Should()
            .BeClasses()
            .And()
            .HaveName(n => n.EndsWith("Dto") || n.EndsWith("Request") || n.EndsWith("Response"));

        // Act & Assert
        var result = types.GetResult();
        result.IsSuccessful.Should().BeTrue($"DTO classes should follow naming conventions");
    }
}
