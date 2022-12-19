using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;

namespace Mvc7S
{
    /// <summary>
    /// Redirectes the user to specified action or url if is not in the role. 
    /// </summary>
    public class RoleRedirectAttribute : ActionMethodSelectorAttribute
    {
        public RoleRedirectAttribute(string role,string action, string controller = null)
        {
            Role = role;
            Action = action;
            Controller = controller;
        }

        public RoleRedirectAttribute(string role,string url)
        {
            Role = role;
            Url = url;
        }

      

        public string Role { get; set; }
        public string Action { get; set; }
        public string Controller { get; set; }
        public string Url { get; set; }
    }
}