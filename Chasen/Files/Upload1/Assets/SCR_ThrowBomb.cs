using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class SCR_ThrowBomb : MonoBehaviour
{
    public Transform player;
    public Transform target;

    public GameObject bomb;

    public SCR_PlayerControl p;

    public float throwDelay;
    public float timer;
    public float gravity;
    public float bombMag;
    public float explTime;

    public float strength;
    public float maxStrength;
    public float multiplier;
    public float maxForce;

    public bool usingCrossHairAim;

    public LayerMask environmentLayer;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (timer - Time.deltaTime <= 0)
        {
            timer = 0;
        }
        else
        {
            timer -= Time.deltaTime;
        }

        if (Input.GetMouseButtonDown(0))
        {
            if (timer == 0 && p.actionable == true)
            {
                timer = throwDelay;
                throwBomb(player.position, target.position);
            }
        }
    }

    //private void OnMouseDown()
    //{
    //    if (timer == 0)\
    //
    //    {
    //        timer = throwDelay;
    //        throwBomb(player.position, target.position);
    //    }
    //}

    private void throwBomb(Vector3 start, Vector3 end)
    {
        // Calculations
        Vector2 direct = end - start;
        float time = 0;
        float vx = 0;
        float vy = 0;
        Vector2 dir = new Vector2(0, 0);

        if (Mathf.Abs(direct.x) + direct.y < 0)
        {
            usingCrossHairAim = false;
        }
        else
        {
            usingCrossHairAim = true;
        }

        if (usingCrossHairAim)
        {
            float arcHeight = Mathf.Abs((float)(Mathf.Abs(direct.y) + Mathf.Abs(Mathf.Atan(direct.normalized.x + direct.normalized.y)) * Mathf.Abs((float)(0.5 * direct.x))));
            vy = Mathf.Sqrt(2 * gravity * arcHeight);
            //float time = (vy + Mathf.Sqrt((float) ((vy * vy) - 4 * (0.5 * gravity) * arcHeight))) / gravity;
            //time = (vy + Mathf.Sqrt((vy * vy) - 4 * (0.5f * gravity) * (-direct.y))) / gravity;
            time = (vy + Mathf.Sqrt((vy * vy) - 2 * gravity * direct.y)) / gravity;
            //Debug.Log(vy);
            vx = direct.x / time;

            //vx = direct.x * strength;
            //vy = direct.y * strength;

            dir = new Vector2(vx, vy);
        }
        else
        {
            dir = direct * strength;
            if (dir.magnitude > maxStrength)
            {
                dir = direct.normalized * maxStrength;
            }
            time = 1 + 0.05f * dir.magnitude;
        }
        
        // Create bomb
        GameObject b = Instantiate(bomb, start, Quaternion.identity);
        Rigidbody2D rb = b.GetComponent<Rigidbody2D>();
        SCR_Bomb s = b.GetComponent<SCR_Bomb>();
        //s.lifetime = time;
        s.magnitude = bombMag;
        s.explLifetime = explTime;
        s.multiplier = multiplier;
        s.env = environmentLayer;
        s.maxForce = maxForce;
        //rb.velocity = new Vector2(vx, vy);
        
        s.lifetime = time;
        rb.velocity = dir;
    }
}
