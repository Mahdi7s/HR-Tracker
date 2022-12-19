using System;
using System.Collections.Generic;
using System.Linq;

namespace Mvc7S
{
    public class Backend : IBackend
    {
        public Backend(IEnumerable<ICommandHandler> commandHandlers = null)
        {
            this.CommandHandlers = commandHandlers;
        }

        public virtual void Send(IBackendCommand command)
        {
            CommandHandlers.First(x => x.CanHandleCommand(command)).HandelCommand(command);
        }

        public virtual void Send<TRes>(IBackendCommand<TRes> command, Action<TRes> reply)
        {
            CommandHandlers.First(x => x.CanHandleCommand(command)).HandelCommand(command, reply);
        }

        public IEnumerable<ICommandHandler> CommandHandlers { get; protected set; }
    }
}