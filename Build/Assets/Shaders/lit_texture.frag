#version 430
//PHONG lighting

#define POINT		0
#define DIRECTIONAL 1
#define SPOT        2

in layout(location = 0) vec3 fposition;
in layout(location = 1) vec3 fnormal;
in layout(location = 2) vec2 ftexcoord;

out layout(location = 0) vec4 ocolor;

uniform struct Material
{
	vec3 diffuse;
	vec3 specular;
	float shininess;
 
	vec2 offset;
	vec2 tiling;
} material;

uniform struct Light
{
	int type;
	vec3 position;
	vec3 direction;
	vec3 color;
	float intensity;
	float range;
	float innerAngle;
	float outererAngle;
} light;
 
uniform vec3 ambientLight;

layout(binding = 0) uniform sampler2D tex;
 
vec3 ads(in vec3 position, in vec3 normal)
{
	// AMBIENT
	vec3 ambient = ambientLight;

	// ATTENUATION
	float attenuation = 1;
	if (light.type != DIRECTIONAL)
	{
		float distanceSqr = distance(light.position - position, light.position - position);
		float rangeSqr = light.range * light.range;
		attenuation = max(0, 1 - pow((distanceSqr / rangeSqr), 2.0));
		attenuation = attenuation * attenuation;
	}
 
	// DIFFUSE
	vec3 lightDir = (light.type == DIRECTIONAL) ? normalize(-light.direction) : normalize(light.position - position);

	float spotIntensity = 1;
	if (light.type == SPOT)
	{
		float angle = acos(dot(light.direction, -lightDir));
		//if (angle > light.innerAngle) spotIntensity = 0;
		spotIntensity = smoothstep(light.outererAngle + 0.001, light.innerAngle, angle);
	}

	float intensity = max(dot(lightDir, normal), 0) * spotIntensity;
	vec3 diffuse = material.diffuse * (light.color * intensity);

	// SPECULAR
	vec3 specular = vec3(0);
	if (intensity > 0)
	{
		vec3 reflection = reflect(-lightDir, normal);
		vec3 viewDir = normalize(-position);
		intensity = max(dot(reflection, viewDir), 0);
		intensity = pow(intensity, material.shininess);
		specular = material.specular * intensity * spotIntensity * light.intensity;
	}
 
	return ambient + (diffuse + specular) * light.intensity * attenuation;
}

void main()
{
	vec4 texcolor = texture(tex, ftexcoord);
	ocolor = texcolor * vec4(ads(fposition, fnormal), 1);
}