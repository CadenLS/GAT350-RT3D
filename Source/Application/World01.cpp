#include "World01.h"
#include "Framework/Framework.h"
#include "Renderer/Renderer.h"
#include "Input/InputSystem.h"

namespace nc
{
    bool World01::Initialize()
    {


        return true;
    }

    void World01::Shutdown()
    {
    }

    void World01::Update(float dt)
    {
        m_angle += dt * 90;
        m_position.x += ENGINE.GetSystem<InputSystem>()->GetKeyDown(SDL_SCANCODE_A) ? -dt : 0;
        m_position.x += ENGINE.GetSystem<InputSystem>()->GetKeyDown(SDL_SCANCODE_D) ? +dt : 0;
        m_time += dt;
    }

    void World01::Draw(Renderer& renderer)
    {
        // pre-render
        renderer.BeginFrame();

        // render
        glPushMatrix();
        glTranslatef(m_position.x, m_position.y, 0); //move shape
        glRotatef(m_angle, 1, 1, 1); //rotate shape
        //glScalef((sin(m_time * 5) + 1) * 0.5f, 1, 1);

        glBegin(GL_TRIANGLE_STRIP);

        glColor3f(1, 0, 0);
        glVertex2f(-0.5f, -0.5f);

        glColor3f(0, 1, 0);
        glVertex2f(0, 0.5f);

        glColor3f(0, 0, 1);
        glVertex2f(0.2f, -0.5f);

        glColor3f(0, 0, 1);
        glVertex2f(-0.7f, 0.2f);

        glColor3f(0, 0, 1);
        glVertex2f(0.1f, 0.4f);

        glColor3f(0, 0, 1);
        glVertex2f(-0.9f, -0.1f);


        glEnd();

        glPopMatrix();

        // post-render
        renderer.EndFrame();
    }
}
