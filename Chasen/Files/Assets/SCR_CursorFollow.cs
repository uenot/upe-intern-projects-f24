using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SCR_CursorFollow : MonoBehaviour
{
    public Transform tf;

    // Start is called before the first frame update
    void Start()
    {
        tf = gameObject.GetComponent<Transform>();
    }

    // Update is called once per frame
    void Update()
    {
        tf.position = new Vector3(Camera.main.ScreenToWorldPoint(Input.mousePosition).x, Camera.main.ScreenToWorldPoint(Input.mousePosition).y, 0);
    }
}
