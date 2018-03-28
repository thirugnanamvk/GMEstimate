﻿using System;
using System.Collections.Generic;
using System.Text;
using HM.GM.DAL.Model;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System.Data;

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
            var query = "Select Practice, Skill ,Competency, CreatedDate, CreatedBy, IsActive from tbl_ResourceCost";
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

                        detail.Competency = Convert.ToString(reader["Competency"]);
                        detail.CreatedBy = Convert.ToString(reader["CreatedBy"]);
                        detail.CreatedDate = Convert.ToDateTime(reader["CreatedDate"]);
                        detail.IsActive = Convert.ToBoolean(reader["IsActive"]);
                        detail.Practice = Convert.ToString(reader["Practice"]);
                        detail.Skill = Convert.ToString(reader["Skill"]);

                        resourceCostDetailList.Add(detail); ;
                    }
                }
            }
            return resourceCostDetailList;
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
                    sp_cmd.Parameters.AddWithValue("@UpdatedBy", resourceCostDetails[0].CreatedBy);
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

        public OrganizationMetadata GetOrganizationMetadata()
        {
            return new OrganizationMetadata
            {
                Competencies = GetAllCompetency(),
                Practices = GetAllPractice(),
                Skills = GetAllSkills(),
            };
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

        private List<string> GetAllSkills()
        {
            var query = "Select DISTINCT Skill from tbl_ResourceCost order by Skill";
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            var skillList = new List<string>();
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
                        skillList.Add(Convert.ToString(reader["Skill"])); ;
                    }
                }
            }
            return skillList;
        }

        private List<string> GetAllCompetency()
        {
            var query = "Select DISTINCT Competency from tbl_ResourceCost order by Competency";
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            var competencyList = new List<string>();
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
                        competencyList.Add(Convert.ToString(reader["Competency"])); ;
                    }
                }
            }
            return competencyList;
        }

        private List<string> GetAllPractice()
        {
            var query = "Select DISTINCT Practice from tbl_ResourceCost order by Practice";
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            var practiceList = new List<string>();
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
                        practiceList.Add(Convert.ToString(reader["Practice"])); ;
                    }
                }
            }
            return practiceList;
        }
    }
}
