using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.Entity;
using System.Linq.Expressions;
using System.Data.Entity.Infrastructure;

namespace Mvc7S
{
    public class SortExpression<TEntity, TType>
    {
        Expression<Func<TEntity, TType>> SortProperty;
    }

    public class Repository<TEntity> where TEntity : class
    {
        protected readonly DbContext _dbContext;
        protected readonly DbSet<TEntity> _dbSet;

        public Repository(DbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<TEntity>();
        }

        public IQueryable<TEntity> GetAll()
        {
            return _dbSet;
        }

        public virtual IEnumerable<TEntity> Get(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<TEntity> query = _dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }

        public virtual TEntity InsertOrUpdate(TEntity entity, Expression<Func<TEntity, bool>> existsFilter)
        {
            var dbEntity = Get(filter: existsFilter).FirstOrDefault();
            if (dbEntity != null)
            {
                Attach(dbEntity);
                Update(entity);
            }
            else
            {
                Insert(entity);
                dbEntity = entity;
            }

            return dbEntity;
        }

        public virtual TEntity GetByID(object id)
        {
            return _dbSet.Find(id);
        }

        public virtual void Insert(TEntity entity)
        {
            _dbSet.Add(entity);
        }

        public virtual void DeleteById(object id)
        {
            TEntity entityToDelete = _dbSet.Find(id);
            DeleteEntity(entityToDelete);
        }

        public virtual void DeleteCascade(Expression<Func<TEntity,bool>> filter,string includeProperties)
        {
            var query = _dbSet.Where(filter);

            foreach (var includeProperty in includeProperties.Split(new[]{','},StringSplitOptions.RemoveEmptyEntries))
            {
                query.Include(includeProperty);
            }

            DeleteEntity(query.First());
        }

        public virtual void DeleteEntity(TEntity entityToDelete)
        {
            _dbContext.Entry(entityToDelete).State = EntityState.Deleted;
        }

        public virtual void Update(TEntity entityToUpdate)
        {
            _dbContext.Entry(entityToUpdate).State = EntityState.Modified;
        }

        public void LoadProperty<TProperty>(TEntity entity, Expression<Func<TEntity, TProperty>> navigationProperty) where TProperty:class
        {
            _dbContext.Entry(entity).Reference(navigationProperty).Load();
        }

        public void LoadCollectionProperty<TElement>(TEntity entity, Expression<Func<TEntity, ICollection<TElement>>> navigationProperty) where TElement : class
        {
            _dbContext.Entry(entity).Collection(navigationProperty).Load();
        }

        public void Attach(TEntity entityToAttach)
        {
            _dbSet.Attach(entityToAttach);
        }

        public void Detach(TEntity entityToDetach)
        {
            _dbContext.Entry(entityToDetach).State = EntityState.Detached;
        }

        public virtual IEnumerable<TEntity> GetWithRawSql(string query, params object[] parameters)
        {
            return _dbSet.SqlQuery(query, parameters).ToList();
        }
    }
}