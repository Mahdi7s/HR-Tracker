using System;
using System.Linq.Expressions;
using System.Reflection;
using Mvc7S;

namespace Mvc7S
{
    public class EntityFactory<TEntity> : IEntityFactory<TEntity>
    {
        TEntity _Entity;

        #region ctr/dtr

        private EntityFactory() { }
        static EntityFactory() { }

        #endregion

        public static IEntityFactory<TEntity> Init(TEntity entity)
        {
            return new EntityFactory<TEntity> { _Entity = entity };
        }

        public IEntityFactory<TEntity> SetValue<TProp>(Expression<Func<TEntity, TProp>> property, TProp value)
        {
            var propertyInfo = property.GetMember() as PropertyInfo;
            propertyInfo.SetValue(_Entity, value, null);
            return this;
        }

        public TEntity Create()
        {
            return _Entity;
        }
    }
}