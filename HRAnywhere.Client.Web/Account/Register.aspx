<%@ Page Title="ثبت نام" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true"
    CodeBehind="Register.aspx.cs" Inherits="HRAnywhere.Client.Web.Account.Register" %>

<%@ Register Assembly="Telerik.Web.UI" Namespace="Telerik.Web.UI" TagPrefix="telerik" %>

<asp:Content runat="server" ID="Head" ContentPlaceHolderID="head">
    <style type="text/css">
        .auto-style1 {
            width: 100%;
        }
    </style>
</asp:Content>
<asp:Content runat="server" ID="ContentPlaceHolder1" ContentPlaceHolderID="ContentPlaceHolder1">
    <telerik:RadFormDecorator ID="RadFormDecorator1" runat="server" />
    <asp:UpdatePanel ID="UpdatePanel1" runat="server" RenderMode="Block" UpdateMode="Always">
        <ContentTemplate>
            <asp:Panel ID="Panel1" runat="server">
                <asp:CustomValidator ID="CustomValidator1" runat="server" Display="None"></asp:CustomValidator>
                <table class="auto-style1">
                    <tr>
                        <td>
                            <asp:Label ID="Label1" runat="server" Text="نام : "></asp:Label>
                            <asp:TextBox ID="txtName" runat="server"></asp:TextBox>
                            <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" Text="*"
                                ErrorMessage=".فیلد نام را بر کنید" Font-Bold="True" ForeColor="Red" ControlToValidate="txtName"></asp:RequiredFieldValidator>
                        </td>
                        <td>
                            <asp:Label ID="Label2" runat="server" Text="نام خانوادگی : "></asp:Label>
                            <asp:TextBox ID="txtLastName" runat="server"></asp:TextBox>
                            <asp:RequiredFieldValidator ControlToValidate="txtLastName" ID="RequiredFieldValidator2"
                                runat="server" Text="*" Font-Bold="True" ForeColor="Red" ErrorMessage="فیلد نام خانوادگی را بر کنید."></asp:RequiredFieldValidator>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="Label3" runat="server" Text="نام شرکت : "></asp:Label>
                            <asp:TextBox ID="txtCoName" runat="server"></asp:TextBox>
                            <%--<asp:DropDownList ID="ddlCompanyName" runat="server"></asp:DropDownList>--%>
                            <asp:RequiredFieldValidator ControlToValidate="txtCoName" ID="RequiredFieldValidator3"
                                runat="server" Text="*" Font-Bold="True" ForeColor="Red" ErrorMessage="فیلد نام شرکت را بر کنید."></asp:RequiredFieldValidator>
                        </td>
                        <td>
                            <%--<asp:Label ID="Label4" runat="server" Text="نام : "></asp:Label>
            <asp:TextBox ID="TextBox4" runat="server"></asp:TextBox>--%>
                            <%--<asp:Button ID="btnCreateCo" runat="server" Text="ایجاد شرکت" />--%>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="Label5" runat="server" Text="نام کاربری : "></asp:Label>
                            <asp:TextBox ID="txtUserName" runat="server"></asp:TextBox>
                            <asp:RequiredFieldValidator ControlToValidate="txtUserName" ID="RequiredFieldValidator5"
                                runat="server" Text="*" Font-Bold="True" ForeColor="Red" ErrorMessage="فیلد نام کاربری را بر کنید"></asp:RequiredFieldValidator>
                        </td>
                        <td>
                            <asp:Label ID="Label4" runat="server" Text="رمز عبور : "></asp:Label>
                            <asp:TextBox ID="txtPassword" runat="server" TextMode="Password"></asp:TextBox>
                            <asp:RequiredFieldValidator ControlToValidate="txtPassword" ID="RequiredFieldValidator4"
                                runat="server" Text="*" Font-Bold="True" ForeColor="Red" ErrorMessage="فیلد رمز عبور را بر کنید."></asp:RequiredFieldValidator>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <asp:Label ID="Label6" runat="server" Text="تکرار رمز عبور : "></asp:Label>
                            <asp:TextBox ID="txtPasswordConfirm" runat="server" TextMode="Password"></asp:TextBox>
                            <asp:RequiredFieldValidator ControlToValidate="txtPasswordConfirm" ID="RequiredFieldValidator6"
                                runat="server" Text="*" Font-Bold="True" ForeColor="Red" ErrorMessage="فیلد تکرار رمز عبور را بر کنید."></asp:RequiredFieldValidator>
                            <asp:CompareValidator ID="CompareValidator1" ControlToCompare="txtPassword" ControlToValidate="txtPasswordConfirm"
                                runat="server" ErrorMessage="با رمز عبور همخوانی ندارد" Text="*" ForeColor="Red"></asp:CompareValidator>
                        </td>
                        <td>
                            <asp:Button ID="btnRegister" runat="server" Text="ثبت نام" 
                                OnClick="btnRegister_Click" />
                        </td>
                    </tr>
                </table>
                <asp:UpdateProgress ID="UpdateProgress1" AssociatedUpdatePanelID="UpdatePanel1" runat="server">
                </asp:UpdateProgress>
                <asp:ValidationSummary ID="ValidationSummary1" ForeColor="Red" runat="server" />
            </asp:Panel>
            <asp:Panel ID="pnlError" runat="server">
            </asp:Panel>
        </ContentTemplate>
    </asp:UpdatePanel>
</asp:Content>
