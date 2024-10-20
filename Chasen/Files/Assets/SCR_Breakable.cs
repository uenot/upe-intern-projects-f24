using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SCR_Breakable : MonoBehaviour
{
    private void OnTriggerEnter2D(Collider2D collision)
    {
        Debug.Log(1);
        if (collision.gameObject.tag == "Explosion")
        {
            Destroy(gameObject);
        }
    }
}
