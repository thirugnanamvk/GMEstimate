﻿using System;
using System.Collections.Generic;
using System.Text;
using HM.GM.DAL.Model;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System.Data;
using System.Linq;
using Newtonsoft.Json;
namespace HM.GM.DAL.Repository
{
    public class ResourceCostRepository : IResourceCostRepository
    {
        private readonly IConfiguration _configuration;

        public ResourceCostRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public List<ResourceCostDetail> GetResourceDetails()
        {
            var query = "Select Id, Practice, Skill ,Competency, CreatedDate, CreatedBy, OffshoreCost, OnsiteCost, IsActive from tbl_ResourceCost order by Practice, Skill, Competency";
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            var resourceCostDetailList = new List<ResourceCostDetail>();
            using (var connection = new MySqlConnection(connectionString))
            {
                using (var cmd = new MySqlCommand(query, connection))
                {
                    connection.Open();
                    cmd.CommandType = CommandType.Text;
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        var detail = new ResourceCostDetail();
                        detail.Id = Convert.ToInt32(reader["Id"]);
                        detail.Competency = Convert.ToString(reader["Competency"]);
                        detail.CreatedBy = Convert.ToString(reader["CreatedBy"]);
                        detail.CreatedDate = Convert.ToDateTime(reader["CreatedDate"]);
                        detail.IsActive = Convert.ToBoolean(reader["IsActive"]);
                        detail.Practice = Convert.ToString(reader["Practice"]);
                        detail.Skill = Convert.ToString(reader["Skill"]);
                        detail.OnsiteCost = Convert.ToDouble(reader["OnsiteCost"]);
                        detail.OffshoreCost = Convert.ToDouble(reader["OffshoreCost"]);
                        resourceCostDetailList.Add(detail); ;
                    }
                }
            }
            return resourceCostDetailList;
        }

        public void SaveChangesResourceCostDetail(ResourceCostDetailList resourceCostDetail)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                var transaction = connection.BeginTransaction();
                try
                {
                    if (resourceCostDetail?.UpdateCostDetailList?.Count > 0)
                    {
                        foreach (var UpdatedResource in resourceCostDetail.UpdateCostDetailList)
                        {
                            var sCommand = "Update tbl_ResourceCost set  OnsiteCost=@OnsiteCost, OffshoreCost=@OffshoreCost, CreatedBy=@CreatedBy where id=" + UpdatedResource.Id;
                            using (var cmd = new MySqlCommand(sCommand.ToString(), connection))
                            {
                                cmd.Parameters.AddRange(new MySqlParameter[]
                                    {
                                    new MySqlParameter{ ParameterName = "@OnsiteCost", Value = UpdatedResource.OnsiteCost},
                                    new MySqlParameter{ ParameterName = "@OffshoreCost", Value = UpdatedResource.OffshoreCost},
                                    new MySqlParameter{ ParameterName = "@CreatedBy", Value = UpdatedResource.CreatedBy != null ? UpdatedResource.CreatedBy.ToUpper() : "ADMIN"},
                                     });
                                cmd.CommandType = CommandType.Text;
                                cmd.ExecuteNonQuery();
                            }
                        }

                    }
                    if (resourceCostDetail?.InsertCostDetailList?.Count > 0)
                    {
                        var sCommand = new StringBuilder("INSERT INTO tbl_ResourceCost (Practice, Skill ,Competency, OnsiteCost, OffshoreCost, CreatedDate, CreatedBy, IsActive ) VALUES ");
                        List<string> Rows = new List<string>();
                        foreach (var resourceInsertCostDetail in resourceCostDetail.InsertCostDetailList)
                        {
                            Rows.Add(string.Format("('{0}','{1}','{2}','{3}','{4}','{5}','{6}', {7})",
                                        MySqlHelper.EscapeString(resourceInsertCostDetail.Practice.ToUpper()),
                                        MySqlHelper.EscapeString(resourceInsertCostDetail.Skill.ToUpper()),
                                        MySqlHelper.EscapeString(resourceInsertCostDetail.Competency.ToUpper()),
                                        resourceInsertCostDetail.OnsiteCost,
                                        resourceInsertCostDetail.OffshoreCost,
                                        String.Format("{0:s}", resourceInsertCostDetail.CreatedDate),
                                        MySqlHelper.EscapeString(resourceInsertCostDetail.CreatedBy != null ? resourceInsertCostDetail.CreatedBy.ToUpper() : "ADMIN"),
                                        resourceInsertCostDetail.IsActive
                            ));
                        }
                        sCommand.Append(string.Join(",", Rows));
                        sCommand.Append(";");
                        using (var cmd = new MySqlCommand(sCommand.ToString(), connection))
                        {
                            cmd.CommandType = CommandType.Text;
                            cmd.ExecuteNonQuery();
                        }
                    }
                    if (resourceCostDetail?.DeleteCostDetailList?.Count > 0)
                    {
                        var records = resourceCostDetail.DeleteCostDetailList.Select(o => o.Id).ToList();
                        var sCommand = new StringBuilder("DELETE FROM tbl_ResourceCost WHERE ID IN (" + String.Join(",", records) + ")");

                        using (var cmd = new MySqlCommand(sCommand.ToString(), connection))
                        {
                            cmd.CommandType = CommandType.Text;
                            cmd.ExecuteNonQuery();
                        }
                    }
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw ex;
                }
                finally
                {
                    connection.Close();
                }
            }
        }

        public void InsertResourceCostDetails(List<ResourceCostDetail> resourceCostDetails)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            using (var connection = new MySqlConnection(connectionString))
            {
                connection.Open();
                var transaction = connection.BeginTransaction();
                try
                {

                    //*************************//
                    //  Update History Table   //
                    //*************************//
                    string sp = "SP_UpdateResourceCostHistory";
                    var sp_cmd = new MySqlCommand(sp, connection);
                    sp_cmd.CommandType = CommandType.StoredProcedure;
                    sp_cmd.Parameters.AddWithValue("@UpdatedBy", resourceCostDetails[0].CreatedBy.ToUpper());
                    sp_cmd.ExecuteNonQuery();

                    //*********************************************//
                    //  Insert new record in resource cost table   //
                    //********************************************//
                    var sCommand = new StringBuilder("INSERT INTO tbl_ResourceCost (Practice, Skill ,Competency, OnsiteCost, OffshoreCost, CreatedDate, CreatedBy, IsActive ) VALUES ");
                    List<string> Rows = new List<string>();
                    foreach (var resourceCostDetail in resourceCostDetails)
                    {
                        Rows.Add(string.Format("('{0}','{1}','{2}','{3}','{4}','{5}','{6}', {7})",
                                    MySqlHelper.EscapeString(resourceCostDetail.Practice.ToUpper()),
                                    MySqlHelper.EscapeString(resourceCostDetail.Skill.ToUpper()),
                                    MySqlHelper.EscapeString(resourceCostDetail.Competency.ToUpper()),
                                    resourceCostDetail.OnsiteCost,
                                    resourceCostDetail.OffshoreCost,
                                    String.Format("{0:s}", resourceCostDetail.CreatedDate),
                                    MySqlHelper.EscapeString(resourceCostDetail.CreatedBy.ToUpper()),
                                    resourceCostDetail.IsActive
                        ));
                    }
                    sCommand.Append(string.Join(",", Rows));
                    sCommand.Append(";");
                    using (var cmd = new MySqlCommand(sCommand.ToString(), connection))
                    {
                        cmd.CommandType = CommandType.Text;
                        cmd.ExecuteNonQuery();
                    }

                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw ex;
                }
                finally
                {
                    connection.Close();
                }
            }
        }

        public Dictionary<string, string> GetGMDefaults()
        {
            var query = "Select PropertyName ,PropertyValue from tbl_GM_Defaults order by id";
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            var gMDefaults = new Dictionary<string, string>();
            using (var connection = new MySqlConnection(connectionString))
            {
                using (var cmd = new MySqlCommand(query, connection))
                {
                    connection.Open();
                    cmd.CommandType = CommandType.Text;
                    var reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        gMDefaults.Add(Convert.ToString(reader["PropertyName"]), Convert.ToString(reader["PropertyValue"]));
                    }
                }
            }
            return gMDefaults;
        }

        public ResourceCostDetail GetCostForResource(string location, string practice, string skill, string competency)
        {
            var query = "Select Practice, Skill ,Competency, OnsiteCost, OffshoreCost, CreatedDate, CreatedBy, IsActive from tbl_ResourceCost" +
                " Where Practice = @Practice AND Skill = @Skill AND  Competency = @Competency ";
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            var detail = new ResourceCostDetail();
            using (var connection = new MySqlConnection(connectionString))
            {
                using (var cmd = new MySqlCommand(query, connection))
                {
                    connection.Open();
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.AddRange(new MySqlParameter[] {
                        new MySqlParameter{ ParameterName = "@Practice", Value = practice.ToUpper()},
                        new MySqlParameter{ ParameterName = "@Skill", Value = skill.ToUpper()},
                        new MySqlParameter{ ParameterName = "@Competency", Value = competency.ToUpper()},

                    });
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        detail.Competency = Convert.ToString(reader["Competency"]);
                        detail.CreatedBy = Convert.ToString(reader["CreatedBy"]);
                        detail.CreatedDate = Convert.ToDateTime(reader["CreatedDate"]);
                        detail.IsActive = Convert.ToBoolean(reader["IsActive"]);
                        detail.OffshoreCost = Convert.ToDouble(reader["OffshoreCost"]);
                        detail.OnsiteCost = Convert.ToDouble(reader["OnsiteCost"]);
                        detail.Practice = Convert.ToString(reader["Practice"]);
                        detail.Skill = Convert.ToString(reader["Skill"]);
                    }
                }
            }
            return detail;
        }

        public UserAccess GetUserAccess(string username)
        {
            var query = "select Id, UserName, IsAdmin from tbl_useraccess where UserName=@username ;";
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            UserAccess userAccess = new UserAccess();
            using (var connection = new MySqlConnection(connectionString))
            {
                using (var cmd = new MySqlCommand(query, connection))
                {
                    connection.Open();
                    cmd.CommandType = CommandType.Text;
                    cmd.Parameters.Add(new MySqlParameter() { ParameterName = "@username", Value = username });
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        userAccess = new UserAccess();
                        userAccess.Id = (Convert.ToInt32(reader["Id"])); ;
                        userAccess.UserName = reader["UserName"].ToString();
                        userAccess.IsAdmin = Convert.ToBoolean(reader["IsAdmin"]);
                    }
                }
            }
            return userAccess;
        }

        public string GetCompetencyMatrix()
        {
            ResourceGroup rs = new ResourceGroup();
            rs.Practice = new List<Practice>();
            var query = "Select distinct Practice from tbl_ResourceCost order by Practice";
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            using (var connection = new MySqlConnection(connectionString))
            {
                using (var cmd = new MySqlCommand(query, connection))
                {
                    connection.Open();
                    cmd.CommandType = CommandType.Text;
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                        rs.Practice.Add(new Practice(rs.Practice.Count + 1, Convert.ToString(reader["Practice"])));
                }
            }


            rs.Skills = new List<SKillCompentency>();
            query = "select p.Practice, p.Skill, p.id from hm_gm.tbl_resourcecost p group by p.Skill,Practice order by p.Practice,p.skill";
            using (var connection = new MySqlConnection(connectionString))
            {
                using (var cmd = new MySqlCommand(query, connection))
                {
                    connection.Open();
                    cmd.CommandType = CommandType.Text;
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        rs.Skills.Add(new SKillCompentency(rs.Skills.Count + 1, Convert.ToString(reader["Skill"]), new Practice(rs.Skills.Count + 1, Convert.ToString(reader["Practice"]))));
                    }
                }
            }
            query = "select Concat(p.Skill,'-',Practice) as Skill , p.Competency ,p.id from hm_gm.tbl_resourcecost p group by p.Competency,p.Skill order by p.Competency,p.skill,p.Practice";
            rs.Compentency = new List<SKillCompentency>();
            using (var connection = new MySqlConnection(connectionString))
            {
                using (var cmd = new MySqlCommand(query, connection))
                {
                    connection.Open();
                    cmd.CommandType = CommandType.Text;
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        rs.Compentency.Add(new SKillCompentency(rs.Compentency.Count + 1, Convert.ToString(reader["Competency"]), new Practice(rs.Compentency.Count + 1, Convert.ToString(reader["Skill"]))));
                    }
                }

            }
            return JsonConvert.SerializeObject(rs, Formatting.None,
                                                    new JsonSerializerSettings
                                                    {
                                                        NullValueHandling = NullValueHandling.Ignore
                                                    });

        }
    }
}
