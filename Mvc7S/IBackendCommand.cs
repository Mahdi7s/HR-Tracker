
namespace Mvc7S
{
    public interface IBackendCommand
    {
        string CommandName { get; }
    }

    public interface IBackendCommand<TQuery> : IBackendCommand { }
}