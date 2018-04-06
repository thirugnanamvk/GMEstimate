using BALModel = HM.GM.BAL.Model;
using DALModel = HM.GM.DAL.Model;
using AutoMapper;

namespace HM.GM
{
    public class AutomapperConfig
    {
        public static void CreateMapping()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<BALModel.ResourceCostDetail, DALModel.ResourceCostDetail>()
                  .ForMember(m => m.CreatedBy, opt => opt.MapFrom(src => src.CreatedBy != null ? src.CreatedBy : "Admin")); //TODO: Get logedIn user name once loging is implemented.
                cfg.CreateMap<DALModel.ResourceCostDetail, BALModel.ResourceCostDetail>();

                cfg.CreateMap<BALModel.OrganizationMetadata, DALModel.OrganizationMetadata>();
                cfg.CreateMap<DALModel.OrganizationMetadata, BALModel.OrganizationMetadata>();

                cfg.CreateMap<BALModel.UserAccess, DALModel.UserAccess>();
                cfg.CreateMap<DALModel.UserAccess, BALModel.UserAccess>();

                cfg.CreateMap<BALModel.ResourceCostDetailList, DALModel.ResourceCostDetailList>();
                cfg.CreateMap<DALModel.ResourceCostDetailList, BALModel.ResourceCostDetailList>();

            });
        }
    }
}
