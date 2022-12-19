using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Linq.Expressions;

namespace Mvc7S
{
    public interface IEntityFactory<TEntity>
    {
        IEntityFactory<TEntity> SetValue<TProp>(Expression<Func<TEntity, TProp>> property, TProp value);
        TEntity Create();
    }
}