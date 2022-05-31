import { Injectable } from '@angular/core';
import { getDatabase, set, ref, Database, push, onValue, equalTo, orderByChild, query, update, } from 'firebase/database'
import { IncidentDetails, IncidentRow, Profile, RaiseIncident, RemarksRow, SubmitRemarks, UserRole } from '../interfaces';



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: Database;
  private profiles: { [index: string]: any } = {};

  constructor() {
    this.db = getDatabase();
  }

  submitIncident(incident: RaiseIncident): Promise<void> {
    const postListRef = ref(this.db, 'incidents');
    const newPostRef = push(postListRef);

    return set(newPostRef, incident);
  }

  getIncident(no: number): Promise<IncidentDetails> {
    return new Promise((resolve, reject) => {
      const incidentQuery = query(ref(this.db, 'incidents'), orderByChild('no'), equalTo(no));

      onValue(incidentQuery, (snapshot) => {
        let incidents: IncidentDetails[] = [];

        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();

          const remarks: RemarksRow[] = [];

          if (childData.remarks !== null) {
            let prop: string = '';
            for (prop in childData.remarks) {
              const item = childData.remarks[prop];
              remarks.push({
                key: prop,
                user: item.user,
                date: item.date,
                remarks: item.remarks,
                status: item.status
              })
            }
          }

          if (childKey !== null) {
            incidents.push({
              key: childKey,
              subject: childData.subject,
              no: childData.no,
              description: childData.description,
              createdBy: childData.createdBy,
              status: childData.status,
              category: childData.category,
              other: childData.other,
              remarks: remarks,
            });
          }
        });

        resolve(incidents[0]);
      }, {
        onlyOnce: true
      })
    });
  }

  getIncidentByKey(key: string): Promise<IncidentDetails> {
    return new Promise((resolve, reject) => {
      const incidentQuery = query(ref(this.db, 'incidents/' + key));

      onValue(incidentQuery, (snapshot) => {

        let data = snapshot.val()
        const remarks: RemarksRow[] = [];

        if (data.remarks !== null) {
          let prop: string = '';
          for (prop in data.remarks) {
            const item = data.remarks[prop];
            remarks.push({
              key: prop,
              user: item.user,
              date: item.date,
              remarks: item.remarks,
              status: item.status
            })
          }
        }

        resolve({
          key: key,
          subject: data.subject,
          no: data.no,
          description: data.description,
          createdBy: data.createdBy,
          status: data.status,
          category: data.category,
          remarks: remarks,
          other: data.other
        });
      }, {
        onlyOnce: true
      })
    });
  }

  getIncidents(): Promise<IncidentRow[]> {
    return new Promise((resolve, reject) => {
      const dbRef = ref(this.db, 'incidents');
      onValue(dbRef, (snapshot) => {
        let incidents: IncidentRow[] = [];

        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          if (childKey !== null) {
            incidents.push({
              key: childKey,
              no: childData.no,
              subject: childData.subject,
              category: childData.category,
              status: childData.status,
              createdBy: childData.createdBy
            });
          }
        });

        resolve(incidents);
      }, {
        onlyOnce: true
      })
    });
  }

  submitRemarks(key: string, remarks: SubmitRemarks): Promise<void> {
    const postListRef = ref(this.db, 'incidents/' + key + '/remarks');
    const newPostRef = push(postListRef);

    return set(newPostRef, remarks);
  }

  setIncidentStatus(key: string, status: string): Promise<void> {
    const updates: { [index: string]: any } = {};
    updates['incidents/' + key + '/status'] = status;
    return update(ref(this.db), updates);
  }

  saveUserProfile(uid: string, profile: Profile): Promise<void> {
    const postListRef = ref(this.db, 'profile/' + uid);
    this.profiles[uid] = profile;
    return set(postListRef, profile);
  }

  getUserProfile(uid: string): Promise<Profile> {
    return new Promise((resolve, reject) => {
      const incidentQuery = query(ref(this.db, 'profile/' + uid));

      onValue(incidentQuery, (snapshot) => {

        let data = snapshot.val()
        if (data) {
          resolve({
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            contactNo: data.contactNo,
            role: data.role,
            email: data.email
          });
        } else {
          resolve({
            contactNo: '',
            firstName: '',
            lastName: '',
            middleName: '',
            role: '',
            email: ''
          })
        }
      }, {
        onlyOnce: true
      })
    });
  }

  getUserProfileCache(uid: string): Promise<Profile> {
    return new Promise((resolve, reject) => {
      if (this.profiles[uid]) {
        resolve(this.profiles[uid]);
      } else {
        this.getUserProfile(uid)
          .then(data => {
            this.profiles[uid] = data;
            resolve(data);
          })
      }
    });
  }

  getUserRoles(): Promise<UserRole[]> {
    return new Promise((resolve, reject) => {
      const dbRef = ref(this.db, 'profile');
      onValue(dbRef, (snapshot) => {
        let profiles: UserRole[] = [];

        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          if (childKey !== null) {

            this.profiles[childKey] = {
              firstName: childData.firstName,
              middleName: childData.middleName,
              lastName: childData.lastName,
              contactNo: childData.contactNo,
              role: childData.role,
              email: childData.email
            };

            profiles.push({
              uid: childKey,
              email: childData.email,
              role: childData.role
            });
          }
        });
        resolve(profiles);
      }, {
        onlyOnce: true
      })
    });
  }

  setRole(uid: string, role: string): Promise<void> {    
    this.profiles[uid].role = role;    
    const updates: { [index: string]: any } = {};
    updates['profile/' + uid + '/role'] = role;    
    return update(ref(this.db), updates);
  }
  
  getRoleCache(uid: string): string {
    return this.profiles[uid]?.role;
  }
}