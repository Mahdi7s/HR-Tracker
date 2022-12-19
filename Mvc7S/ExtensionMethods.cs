using System;
using System.Collections.Generic;
using System.Linq;

namespace Mvc7S
{
    public static class CollectionExtensions
    {
        public static IEnumerable<T> Apply<T>(this IEnumerable<T> collection, Action<T> action)
        {
            if (collection != null)
            {
                foreach (var item in collection)
                    action(item);
            } return collection;
        }

        public static bool IsNullOrEmpty<T>(this IEnumerable<T> collection)
        {
            return (collection == null || collection.Count() <= 0);
        }

        public static IEnumerable<R> Cast<T, R>(this IEnumerable<T> collection, Func<T, R> convertFunc)
        {
            ThrowExceptionIfIsNull<T>(collection);

            foreach (var item in collection)
                yield return convertFunc(item);
        }

        public static bool AddIfNotContaions<T>(this ICollection<T> collection, T item)
        {
            ThrowExceptionIfIsNull(collection);

            if (!collection.Contains(item))
            {
                collection.Add(item); return true;
            }
            return false;
        }

        private static void ThrowExceptionIfIsNull<T>(IEnumerable<T> collection)
        {
            if (collection.IsNullOrEmpty())
                throw new ArgumentNullException("Collection");
        }
    }

    public static class ObjectExtensions
    {
        public static bool HasTypeAs(this object obj, object obj2)
        {
            return obj.GetType().Equals(obj2.GetType());
        }

        public static bool HasTypeAs<T>(this object obj)
        {
            return obj.GetType().Equals(typeof(T));
        }

        public static bool HasTypeAs(this object obj, Type type)
        {
            return obj.GetType().Equals(type);
        }
    }
}