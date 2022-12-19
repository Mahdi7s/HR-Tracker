using System;

namespace Mvc7S
{
    public interface ICommandHandler
    {
        bool CanHandleCommand(IBackendCommand command);

        void HandelCommand(IBackendCommand command);
        void HandelCommand<TQuery>(IBackendCommand<TQuery> command, Action<TQuery> reply);
    }
}