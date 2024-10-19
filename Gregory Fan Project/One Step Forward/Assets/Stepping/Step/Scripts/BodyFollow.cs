using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;

public class BodyFollow : MonoBehaviour
{
    [SerializeField] GameObject leftFoot;
    [SerializeField] GameObject rightFoot;

    // Update is called once per frame
    void Update()
    {
        float yDiff = (leftFoot.transform.position.y + rightFoot.transform.position.y) / 2;
        transform.position = new Vector2(transform.position.x, yDiff);
    }
}
