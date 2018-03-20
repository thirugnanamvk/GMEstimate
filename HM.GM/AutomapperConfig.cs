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
                cfg.CreateMap<BALModel.ResourceCostDetail, DALModel.ResourceCostDetail>();
                cfg.CreateMap<DALModel.ResourceCostDetail, BALModel.ResourceCostDetail>();
                cfg.CreateMap<BALModel.GMDefaults, DALModel.GMDefaults>();
                cfg.CreateMap<DALModel.GMDefaults, BALModel.GMDefaults>();
            });
        }
    }
}
