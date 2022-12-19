using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mvc7S
{
    public static class IoC
    {
        public static T Get<T>()
        {
            return DependencyResolver.Current.GetService<T>();
        }

        public static T Get<T>(Type serviceType)
        {
            return (T)DependencyResolver.Current.GetService(serviceType);
        }

        public static T Get<T>(string contractName)
        {
            return Get<T>(Type.GetType(contractName));
        }

        public static IEnumerable<T> GetAll<T>()
        {
            return DependencyResolver.Current.GetServices<T>();
        }

        public static IEnumerable<T> GetAll<T>(Type serviceType)
        {
            return (IEnumerable<T>)DependencyResolver.Current.GetServices(serviceType);
        }

        public static IEnumerable<T> GetAll<T>(string serviceName)
        {
            return GetAll<T>(Type.GetType(serviceName));
        }
    }
}