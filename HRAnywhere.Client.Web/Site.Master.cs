using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace HRAnywhere.Client.Web
{
    public partial class Site : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
               
            }
        }

        protected void RadMenu1_ItemDataBound(object sender, Telerik.Web.UI.RadMenuEventArgs e)
        {
            SiteMapNode node = (SiteMapNode)e.Item.DataItem;
            if (node.Roles == null || node.Roles.Count <= 0) return;

            switch ((string)node.Roles[0])
            {
                case "*":
                    e.Item.Visible = Context.User.Identity.IsAuthenticated;
                    break;
                case "anonymous":
                    e.Item.Visible = !Context.User.Identity.IsAuthenticated;
                    break;
                default:
                    e.Item.Visible = false;
                    foreach (string role in node.Roles)
                    {
                        if (Context.User.IsInRole(role))
                        {
                            e.Item.Visible = true;
                            break;
                        }
                    }
                    break;
            }
        }
    }
}