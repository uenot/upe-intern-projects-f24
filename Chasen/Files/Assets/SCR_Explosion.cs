using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SCR_Explosion : MonoBehaviour
{
    private Transform tf;

    public float magnitude;
    public float lifetime;
    private float timer;
    public float multiplier;
    public float maxForce;

    public LayerMask env;

    private void Start()
    {
        tf = gameObject.GetComponent<Transform>();
        tf.localScale = new Vector3(magnitude, magnitude, magnitude);
        timer = 0;
    }

    // Update is called once per frame
    void Update()
    {
        timer += Time.deltaTime;
        if (timer >= lifetime)
        {
            Destroy(gameObject);
        }
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        //Debug.Log("trigger detected");
        if (!(collision.gameObject.tag == "Environment"))
        {
            //Debug.Log("triggered by ", collision.gameObject);
            Rigidbody2D r = collision.gameObject.GetComponent<Rigidbody2D>();
            Transform t = collision.gameObject.GetComponent<Transform>();
            Vector2 dir = t.position - tf.position;
            if ((dir.normalized * magnitude * multiplier / Mathf.Pow(dir.magnitude, 2)).magnitude > maxForce)
            {
                //Debug.Log(1);
                r.AddForce(dir.normalized * maxForce);
            }
            else
            {
                //Debug.Log(2);
                r.AddForce(dir.normalized * magnitude * multiplier / Mathf.Pow(dir.magnitude, 2));
            }
        }
    }

    //private void OnCollisionEnter2D(Collision2D collision)
    //{
    //    Debug.Log("collision detected");
    //    if (!(collision.gameObject.tag == "Environment"))
    //    {
    //        Debug.Log("collision with ", collision.gameObject);
    //        Rigidbody2D r = collision.gameObject.GetComponent<Rigidbody2D>();
    //        Transform t = collision.gameObject.GetComponent<Transform>();
    //        Vector2 dir = t.position - tf.position;
    //        r.AddForce(dir.normalized * magnitude / Mathf.Pow(dir.magnitude, 2));
    //    }
    //}
}
