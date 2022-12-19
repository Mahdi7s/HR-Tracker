using System;
using System.Linq;
using System.ServiceModel;
using HRAnywhere.Model;

namespace HRAnywhere.Contracts
{
    [ServiceContract(SessionMode = SessionMode.Required)]
    public interface IHRAnywhereService
    {
        [OperationContract]
        IQueryable<Member> GetMembers(Func<Member, bool> filter = null);
        [OperationContract]
        Member GetMe();
        [OperationContract]
        int InsertMember(Member member);
        [OperationContract]
        bool DeleteMember(int memberId);
        [OperationContract(Name = "DeleteMemberByName")]
        bool DeleteMember(string memberName);
        [OperationContract]
        bool UpdateMember(Member member);
        [OperationContract]
        void SetOnline(bool isOnline);
        [OperationContract]
        int InsertCompany(Company company, Member admin);
        [OperationContract]
        bool UpdateCompany(Company company);

        //-------------------------Provider Operations---------------------------
        [OperationContract]
        bool IsUserInRole(string username, string roleName);
        [OperationContract]
        string[] GetRolesForUser(string username);
        [OperationContract]
        bool ValidateUser(string username, string password);
        [OperationContract]
        bool ChangePassword(string username, string oldPassword, string newPassword);
    }
}
