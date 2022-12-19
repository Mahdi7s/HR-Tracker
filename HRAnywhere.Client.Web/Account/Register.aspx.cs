using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HRAnywhere.Client.Web.HRAnywhereServiceReference;
using System.ServiceModel;
using HRAnywhere.Model;
using System.Web.Security;
using HRAnywhere.Client.Web.Utils;

namespace HRAnywhere.Client.Web.Account
{
    public partial class Register : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        protected void btnRegister_Click(object sender, EventArgs e)
        {
            RegisterUser();
        }

        private void RegisterUser()
        {
            try
            {
                var proxy = Helpers.NewServiceProxy(false);
                proxy.ClientCredentials.UserName.UserName = "Anonymous";
                proxy.ClientCredentials.UserName.Password = "AnonymousPass";
                var member = new Member { FirstName = txtName.Text, LastName = txtLastName.Text, UserName = txtUserName.Text, Password = txtPassword.Text, RoleEnum = RoleKind.Admin, IsOnline = true };
                var memId = proxy.InsertCompany(new Company { CompanyName = txtCoName.Text }, member);
                proxy.Close();

                FormsAuthentication.SetAuthCookie(txtUserName.Text, false);
                Helpers.UserName = txtUserName.Text;
                Helpers.Password = txtPassword.Text;

                Response.Redirect("~/Default.aspx");
            }
            catch (FaultException ex)
            {
                CustomValidator1.ErrorMessage = ex.Message;
                CustomValidator1.IsValid = false;
            }
        }
    }
}