using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.ComponentModel.Composition.Hosting;
using System.Linq;

namespace Mvc7S
{
    public class MefBootstrapper : Bootstrapper
    {
        CompositionContainer _container;
        AggregateCatalog _aggregateCatalog;

        protected override void Configure()
        {
            _aggregateCatalog = new AggregateCatalog(SelectAssemblies().Select(x => new AssemblyCatalog(x)));
            
            _container = new CompositionContainer(_aggregateCatalog);

            var batch = new CompositionBatch();

            RegisterBootstrapperExports(batch);

            _container.Compose(batch);
        }

        protected virtual void RegisterBootstrapperExports(CompositionBatch batch)
        {
            batch.AddExportedValue(_container);
            batch.AddExportedValue(_aggregateCatalog);
        }

        public override void BuildUp(object instance)
        {
            _container.SatisfyImportsOnce(instance);
        }

        public override object GetService(Type service)
        {
            var contract = AttributedModelServices.GetContractName(service);
            return _container.GetExportedValues<object>(contract).FirstOrDefault();
        }

        public override IEnumerable<object> GetServices(Type service)
        {
            return _container.GetExportedValues<object>(AttributedModelServices.GetContractName(service));
        }
    }
}