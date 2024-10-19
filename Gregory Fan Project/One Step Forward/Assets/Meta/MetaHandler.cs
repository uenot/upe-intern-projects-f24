using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MetaHandler : MonoBehaviour
{
    public bool dead;
   private void Start() {
      GameObject[] allMeta = GameObject.FindGameObjectsWithTag("Meta");
      if(allMeta.Length > 1){
        Destroy(gameObject);
      }
   }
}
