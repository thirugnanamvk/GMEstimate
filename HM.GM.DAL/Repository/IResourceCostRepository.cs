using HM.GM.DAL.Model;
using System.Collections.Generic;

namespace HM.GM.DAL.Repository
{
    public interface IResourceCostRepository
    {
        void InsertResourceCostDetails(List<ResourceCostDetail> resourceCostDetailList);
        void DeleteResourceCostDeatils(List<ResourceCostDetail> resourceCostDetailList);
        void UpdateResourceCostDetails(List<ResourceCostDetail> resourceCostDetailList);


        List<ResourceCostDetail> GetResourceDetails();

        GMDefaults GetGMDefaults();

        ResourceCostDetail GetCostForResource(string location, string practice, string skill, string competency);

        OrganizationMetadata GetOrganizationMetadata();

        UserAccess GetUserAccess(string username);
    }
}
