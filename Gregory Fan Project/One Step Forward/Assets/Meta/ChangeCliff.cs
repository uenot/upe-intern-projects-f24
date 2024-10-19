using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ChangeCliff : MonoBehaviour
{
    [SerializeField] GameObject stepCam;
    [SerializeField] GameObject foot1;
    [SerializeField] GameObject foot2;
    [SerializeField] GameObject cliffCam;
    [SerializeField] GameObject gameHandler;
    bool alreadySet = false;



    // Update is called once per frame
    void Update()
    {
        if(!alreadySet && foot1.transform.position.y >= transform.position.y && foot2.transform.position.y >= transform.position.y){
            stepCam.SetActive(false);
            cliffCam.SetActive(true);
            gameHandler.GetComponent<CameraSwitching>().stepCamera = cliffCam;
        }
    }
}
