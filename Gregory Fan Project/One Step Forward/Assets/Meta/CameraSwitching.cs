using System.Collections;
using System.Collections.Generic;
using UnityEngine;

//Handles Camera Switching Between The Two Places
public class CameraSwitching : MonoBehaviour
{
    bool viewing = false;

    [SerializeField] public GameObject stepCamera;
    [SerializeField] GameObject viewCamera;
    

    [SerializeField] KeyCode switchControl = KeyCode.Space;

    // Update is called once per frame
    void Update()
    {
        if(Input.GetKeyDown(switchControl)){
            if(viewing){
                stepCamera.SetActive(true);
                viewCamera.SetActive(false);
            }else{
                stepCamera.SetActive(false);
                viewCamera.SetActive(true);
            }
            viewing = !viewing;
        }
    }
}
