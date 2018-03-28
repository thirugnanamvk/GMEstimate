using HM.GM.BAL.Model;
using System.Collections.Generic;

namespace HM.GM.BAL.Processors
{
    public interface IResourceCostProcessor
    {
        void InsertResourceCostDetails(List<ResourceCostDetail> resourceCostDetailList);

        List<ResourceCostDetail> GetResourceCostDetails();

        Dictionary<string, string> GetGMDefaults();

        GMInput CalculateGM(GMInput gMInput);

        OrganizationMetadata GetOrganizationMetadata();

        UserAccess GetUserAccess(string username);
    }
}
