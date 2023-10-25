#version 430

//in layout(location = 0) vec3 color;
in layout(location = 1) vec2 texcoord;

out layout(location = 0) vec4 ocolor;

layout(binding = 0) uniform sampler2D tex1;
layout(binding = 1) uniform sampler2D tex2;

uniform vec4 color;
uniform vec2 offset;
uniform vec2 tiling;

void main()
{
	vec4 texcolor1 = texture(tex1, (texcoord * tiling) + offset);
	vec4 texcolor2 = texture(tex2, (texcoord * tiling) + offset);

	vec4 texcolor = mix(texcolor1, texcolor2, 0.5);

	ocolor = texcolor * color;
}
