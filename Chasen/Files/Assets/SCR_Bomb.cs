using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SCR_Bomb : MonoBehaviour
{
    private CircleCollider2D col;
    private Rigidbody2D rb;
    private Transform tf;

    public GameObject explosion;

    public float lifetime;
    private float timer;
    public float magnitude;
    public float explLifetime;
    public float multiplier;
    public float maxForce;

    public LayerMask env;

    void Awake()
    {
        col = gameObject.GetComponent<CircleCollider2D>();
        rb = gameObject.GetComponent<Rigidbody2D>();
        tf = gameObject.GetComponent<Transform>();
        col.isTrigger = true;
        timer = 0;
    }

    // Update is called once per frame
    void Update()
    {
        timer += Time.deltaTime;
        if (timer >= lifetime)
        {
            detonate(explosion, magnitude);
        }
    }

    //private void OnCollisionExit2D(Collision2D collision)
    //{
    //    if (collision.gameObject.tag == "Player")
    //    {
    //        col.isTrigger = false;
    //    }
    //}

    private void OnTriggerExit2D(Collider2D collision)
    {
        if (collision.gameObject.tag == "Player")
        {
            col.isTrigger = false;
        }
    }

    private void detonate(GameObject expl, float mag)
    {
        col.isTrigger = true;
        GameObject e = Instantiate(expl, tf.position, Quaternion.identity);
        SCR_Explosion s = e.GetComponent<SCR_Explosion>();
        s.magnitude = mag;
        s.lifetime = explLifetime;
        s.multiplier = multiplier;
        s.env = env;
        s.maxForce = maxForce;
        Destroy(gameObject);
    }
}
