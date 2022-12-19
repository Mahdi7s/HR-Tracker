using System;
using System.Collections.Generic;

namespace Mvc7S
{
    public interface IBackend
    {
        void Send(IBackendCommand command);
        void Send<TQuery>(IBackendCommand<TQuery> command, Action<TQuery> reply);

        IEnumerable<ICommandHandler> CommandHandlers { get; } 
    }
}