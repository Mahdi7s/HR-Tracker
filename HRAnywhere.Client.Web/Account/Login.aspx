<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="HRAnywhere.Client.Web.Account.Login" %>

<%@ Register Assembly="Telerik.Web.UI" Namespace="Telerik.Web.UI" TagPrefix="telerik" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
        .style1
        {
            width: 100%;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <telerik:RadFormDecorator ID="RadFormDecorator1" runat="server" />
    <table class="style1">
        <tr>
            <td>
                <asp:Label ID="Label1" runat="server" Text="نام کاربری : "></asp:Label>
            </td>
            <td>
                <asp:TextBox ID="txtUserName" runat="server"></asp:TextBox>
                <asp:RequiredFieldValidator ControlToValidate="txtUserName" ID="RequiredFieldValidator1" runat="server" 
                    ErrorMessage="لطفا فیلد نام کاربری را بر کنید." Text="*" ForeColor="Red" Font-Bold="true"></asp:RequiredFieldValidator>
            </td>
        </tr>
        <tr>
            <td>
                <asp:Label ID="Label2" runat="server" Text="رمز عبور : "></asp:Label>
            </td>
            <td>
                <asp:TextBox ID="txtPasssword" TextMode="Password" runat="server"></asp:TextBox>
                <asp:RequiredFieldValidator ControlToValidate="txtPasssword" ID="RequiredFieldValidator2" runat="server" 
                    ErrorMessage="لطفا فیلد رمز عبور را بر کنید." Text="*" ForeColor="Red" Font-Bold="true"></asp:RequiredFieldValidator>
            </td>
        </tr>
        <tr>
            <td>
                <asp:CheckBox ID="cbRememberMe" runat="server" Text="به خاطر سبردن" Checked="true" />
            </td>
            <td>
                &nbsp;</td>
        </tr>
    </table>
    <asp:Button ID="Button1" runat="server" Text="ورود" onclick="Button1_Click" /><br />
    <asp:CustomValidator ID="CustomValidator1" runat="server" Display="None"></asp:CustomValidator>
    <asp:ValidationSummary ID="ValidationSummary1" runat="server" ForeColor="Red" Font-Bold="true"/>
    
</asp:Content>
