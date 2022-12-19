using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using HRAnywhere.Model;
using HRAnywhere.Services;
using System.ServiceModel;
using HRAnywhere.DataModel;
using System.Data.SqlClient;
using System.Web.Security;

namespace HRAnywhere.Server.Web.Account
{
    public partial class Register : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void btnRegister_Click(object sender, EventArgs e)
        {
            try
            {
                using (var uof = new UnitOfWork())
                {
                    var creatorRole = RoleKind.CreatorCoAdmin.ToString();
                    if(uof.MemberRep.GetAll().Any(x=>x.Role.Equals(creatorRole, StringComparison.OrdinalIgnoreCase)))
                    {
                        CustomValidator1.ErrorMessage = "مدیر کل برنامه قبلا ثبت شده است.";
                        CustomValidator1.IsValid = false;
                        ckRedirect.Checked = true;
                        return;
                    }

                    var admin = new Member { FirstName = txtName.Text, LastName = txtLastName.Text, UserName = txtUserName.Text, Password = txtPassword.Text, RoleEnum = RoleKind.CreatorCoAdmin, IsOnline = true };
                    var company = new Company { CompanyName = txtCoName.Text };

                    uof.CompanyRep.Insert(company);
                    uof.SaveChanges();
                    admin.CompanyId = company.CompanyId;
                    uof.MemberRep.Insert(admin);
                    uof.SaveChanges();
                }
                FormsAuthentication.SetAuthCookie(txtUserName.Text, false);
                Response.Redirect("~/Default.aspx");
            }
            catch (Exception ex)
            {
                CustomValidator1.ErrorMessage = ex.Message;
                CustomValidator1.IsValid = false;
            }
        }
    }
}