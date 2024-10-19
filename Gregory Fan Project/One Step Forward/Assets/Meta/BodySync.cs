using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BodySync : MonoBehaviour
{
    [SerializeField] GameObject stepBody;
    [SerializeField] GameObject viewBody;

    [SerializeField] float stepToViewRate = 30;

    //Base Variables
    float stepStartY;
    float viewStartX;

    // Start is called before the first frame update
    void Start()
    {
        stepStartY = stepBody.transform.position.y;
        viewStartX = viewBody.transform.position.x;
    }

    // Update is called once per frame
    void Update()
    {
        float dx = (stepBody.transform.position.y - stepStartY) * stepToViewRate;
        Vector2 newPos = new Vector2(dx + viewStartX, viewBody.transform.position.y);
        viewBody.transform.position = newPos;
    }
}
