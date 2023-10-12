#version 430

in layout(location = 0) vec3 color;
in layout(location = 1) vec2 texcoord;

out layout(location = 0) vec4 ocolor;

layout(binding = 0) uniform sampler2D tex; //add multiple for more textures

uniform vec2 offset;
uniform vec2 tiling;

void main()
{
	vec3 texcolor = texture(tex, (texcoord * tiling) + offset).rgb;//can make it whatever color u want EX: bbb
	ocolor = vec4(texcolor, 1);
}
