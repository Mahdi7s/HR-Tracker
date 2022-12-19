using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HRAnywhere.Client.Web.HRAnywhereServiceReference;

namespace HRAnywhere.Client.Web.Utils
{
    public static class Helpers
    {
        public static string UserName
        {
            get
            {
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    return HttpContext.Current.User.Identity.Name;
                }
                else if (HttpContext.Current.Request.Cookies.AllKeys.Contains("HRAW-UserName"))
                {
                    return HttpContext.Current.Request.Cookies["HRAW-UserName"].Value;
                }
                return null;
            }
            set
            {
                if (!string.IsNullOrEmpty(value))
                {
                    HttpContext.Current.Response.Cookies["HRAW-UserName"].Value = value;
                    HttpContext.Current.Response.Cookies["HRAW-UserName"].Expires = DateTime.Now.AddYears(1);                    
                }
            }
        }

        public static string Password
        {
            get
            {
                var username = UserName;
                if (!string.IsNullOrEmpty(username))
                {
                    if (HttpContext.Current.Request.Cookies.AllKeys.Contains(username))
                    {
                        return HttpContext.Current.Request.Cookies[username].Value;
                    }
                }
                return null;
            }
            set
            {
                if (!string.IsNullOrEmpty(value))
                {
                    var username = UserName;
                    if (!string.IsNullOrEmpty(username))
                    {
                        HttpContext.Current.Response.Cookies[username].Value = value;
                        HttpContext.Current.Response.Cookies[username].Expires = DateTime.Now.AddYears(1);
                    }
                }
            }
        }

        public static HRAnywhereServiceClient NewServiceProxy(bool needCredentials = true)
        {
            var proxy = new HRAnywhereServiceClient();

            if (needCredentials)
            {
                proxy.ClientCredentials.UserName.UserName = Helpers.UserName;
                proxy.ClientCredentials.UserName.Password = Helpers.Password;
            }

            return proxy;
        }

        public static void SetOnline(bool isOnline)
        {
            if (HttpContext.Current.User.Identity.IsAuthenticated)
            {
                var proxy = Helpers.NewServiceProxy();
                proxy.SetOnline(false);
                proxy.Close();
            }
        }
    }
}