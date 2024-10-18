using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class SCR_PlayerControl : MonoBehaviour
{
    public Rigidbody2D rb;
    public Transform tf;
    public Transform groundCheck;

    public LayerMask eLayer;

    public float walkSpeed;
    public bool onGround;
    public bool actionable;

    public GameObject finish;

    // Start is called before the first frame update
    void Start()
    {
        rb = gameObject.GetComponent<Rigidbody2D>();
        tf = gameObject.GetComponent<Transform>();

        actionable = true;
    }

    // Update is called once per frame
    void Update()
    {
        onGround = Physics2D.OverlapPoint(groundCheck.position, eLayer);

        if (onGround && actionable)
        {
            rb.velocity = new Vector2(Input.GetAxisRaw("Horizontal") * walkSpeed, 0);
        }
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.tag == "Finish")
        {
            Debug.Log("won");
            SpriteRenderer spr = collision.gameObject.GetComponent<SpriteRenderer>();
            spr.color = Color.green;
            actionable = false;
            finish.SetActive(true);
        }
    }

    public void Reset()
    {
        SceneManager.LoadScene("Main");
    }
}
