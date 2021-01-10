using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace AnnotateJS
{
    public static class AnnotateExtensions
    {
        #region Extensions

        /// <summary>
        /// Renders an annotated C# object model to the client in JSON format.
        /// </summary>
        /// <typeparam name="T">Any reference type</typeparam>
        /// <param name="model">Annotated reference type model</param>
        /// <returns>HtmlString (JSON formatted)</returns>
        public static string AnnotateJSON<T>(this T model) where T : class, new()
        {
            StringBuilder output = new StringBuilder();
            output.Append(Environment.NewLine + "{" + Environment.NewLine);

            Type modelType = typeof(T);

            List<string> properties = new List<string>();
            modelType.GetProperties().ToList().ForEach(p =>
            {

                // See if the property is decorated with a annotations
                var annotated = p.GetCustomAttribute<Annotated>();

                if (annotated != null)
                {
                    // Add the annotated property
                    properties.Add(string.Format("\t${0}:{1}", p.Name, annotated.ToString()));
                }

                object propValue = null;

                // Try to get the value of the property
                try
                {
                    propValue = p.GetValue(model, null);
                }
                catch (Exception)
                {
                    propValue = "null";
                }

                // Add the main property
                properties.Add(string.Format("\t{0}:{1}", p.Name, propValue != null ? "\"" + propValue + "\"" : "null"));

            });

            output.Append(string.Join("," + Environment.NewLine, properties.ToArray()));

            output.Append(Environment.NewLine + "};");

            return output.ToString();
        }

        #endregion Helper Extensions
    }
}
